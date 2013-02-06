from __future__ import unicode_literals

import sqlalchemy
from sqlalchemy import orm
from sqlalchemy.ext import declarative
from sqlalchemy.orm import sessionmaker

import utils

Base = declarative.declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    name = sqlalchemy.Column(sqlalchemy.String)
    password = sqlalchemy.Column(sqlalchemy.String)
    nickname = sqlalchemy.Column(sqlalchemy.String)
    email = sqlalchemy.Column(sqlalchemy.String)
    created_at = sqlalchemy.Column(sqlalchemy.DateTime)

    profile_id = sqlalchemy.Column(sqlalchemy.Integer,
                                   sqlalchemy.ForeignKey('profiles.id'))

    profile = orm.relationship('Profile', 
                               backref=orm.backref('user', uselist=False))

    def __init__(self, name, password, nickname, email):
        self.name = name
        self.password = utils.hash_password(password)
        self.nickname = nickname
        self.email = email

class Profile(Base):
    __tablename__ = 'profiles'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    bio = sqlalchemy.Column(sqlalchemy.String)
    city = sqlalchemy.Column(sqlalchemy.String)
    links = orm.relationship('Link', backref='profile')

    def __init__(self, bio, city):
        self.bio = bio
        self.city = city

class Link(Base):
    __tablename__ = 'links'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    name = sqlalchemy.Column(sqlalchemy.String)
    url = sqlalchemy.Column(sqlalchemy.String)
    profile_id = sqlalchemy.Column(sqlalchemy.Integer, 
                                   sqlalchemy.ForeignKey('profiles.id'))
    def __init__(self, name, url):
        self.name = name
        self.url = url

class Database(object):
    def __init__(self, conn_str='sqlite:///:memory:'):
        self.conn_str = conn_str
        self.engine = sqlalchemy.create_engine(self.conn_str)
        self.session_factory = sessionmaker(bind=self.engine)

    def create_structure(self):
        Base.metadata.create_all(self.engine)

    def create_session(self):
        return self.session_factory()

