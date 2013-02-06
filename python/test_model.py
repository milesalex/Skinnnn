import unittest

import model

class TestModel(unittest.TestCase):
    def setUp(self):
        self.db = model.Database()
        self.db.create_structure()

    def tearDown(self):
        self.db = None

    def test_01_create_user(self):
        session = self.db.create_session()
        user1 = model.User('user1', 'password1', 'nickname1', '1@mail.no')
        session.add(user1)

        session.commit()
        self.assertEquals(user1.id, 1)

    def test_02_create_user_profile(self):
        session = self.db.create_session()
        user1 = model.User('user1', 'password1', 'nickname1', '1@mail.no')
        profile1 = model.Profile('bio1', 'city1')
        user1.profile = profile1
        session.add(user1)

        session.commit()
        self.assertEquals(profile1.id, 1)

    def test_03_create_user_profile_links(self):
        session = self.db.create_session()
        user1 = model.User('user1', 'password1', 'nickname1', '1@mail.no')
        profile1 = model.Profile('bio1', 'city1')
        user1.profile = profile1

        link1 = model.Link('link1', 'http://link1')
        user1.profile.links.append(link1)

        link2 = model.Link('link2', 'http://link2')
        user1.profile.links.append(link2)

        link3 = model.Link('link3', 'http://link3')
        user1.profile.links.append(link3)

        session.add(user1)
        session.commit()

        self.assertEquals(link1.id, 1)
        self.assertEquals(link2.id, 2)
        self.assertEquals(link3.id, 3)

def load_tests(loader, tests, pattern):
    suite = unittest.TestSuite()
    tests = loader.loadTestsFromTestCase(TestModel)
    suite.addTests(tests)
    return suite

if __name__ == '__main__':
    unittest.main()

