import hashlib

# don't you ever loose this
# never
SALT = 'fem82HTbSz7GdSKXvPeIIAk3'

def hash_password(password):
    m = hashlib.md5(SALT)
    m.update(password)
    return m.hexdigest()
