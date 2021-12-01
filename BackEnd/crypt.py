# -*- coding: utf-8 -*-
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64


def load_key(key_file_in):
    return RSA.import_key(open(key_file_in).read())

def encrypt(data, public_key):
    return base64.b64encode(PKCS1_OAEP.new(public_key).encrypt(data.encode("utf-8"))).decode('utf-8')

def decrypt(data, private_key):
    return PKCS1_OAEP.new(private_key).decrypt(base64.decodebytes(data.encode("utf-8"))).decode('utf-8')


def generate_new_keypair(public_key_out="public_key.bin", private_key_out="private_key.bin"):
    key_pair = RSA.generate(2048)  # 2048 bits - sufficient for our pursposes xD

    public_key = key_pair.publickey().exportKey()
    private_key = key_pair.exportKey()

    with open(public_key_out, "wb") as f_out:
        f_out.write(public_key)
    with open(private_key_out, "wb") as f_out:
        f_out.write(private_key)

if __name__ == "__main__":
    generate_new_keypair()
