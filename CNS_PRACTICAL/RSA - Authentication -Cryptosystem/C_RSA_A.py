# Import socket module
import socket            
from random import randint
import math

def generate_prime():# generate random prime function
	x = randint(1, 25)
	while True:
		if is_prime(x):
			break
		else:
			x += 1
	return x


def is_prime(x):# primality check function
	i = 2
	root = math.ceil(math.sqrt(x))
	while i <= root:
		if x % i == 0:
			return False
		i += 1
	return True

# function to find gcd
def gcd(a, b):
	while b:
		a, b = b, a%b
	return a

# function to find extended gcd
def egcd(a, b):
	if a == 0:
		return (b, 0, 1)
	else:
		g, y, x = egcd(b % a, a)
		return (g, x - (b // a) * y, y)

# function to find modular inverse
def modinv(a,m):
	g,x,y = egcd(a,m)
	if g != 1:
		return None
	else:
		return x%m
# next create a socket object

pb = 13
qb = 17
nb = pb * qb

nb1 = (pb - 1) * (qb - 1)

r = randint(2,100) # For efficiency 2 < e < 100
while True:
	if gcd(r, nb1) == 1:
		break
	else:
		r += 1
eb = r
#print("ea = %d" % eb)

	# Compute d, the modular multiplicative inverse of e
	# Private key exponent d
private_b = modinv(eb, nb1)
print("Private key of B is: %d" % private_b)


public_b = str(str(eb)+" " +str(nb) )
print("Public key of B is: " + public_b)
# Create a socket object
s = socket.socket()        
 
# Define the port on which you want to connect
port = 1232            
 
# connect to the server on local computer
s.connect(('127.0.0.1', port))
 
# receive data from the server and decoding to get the string.

s.sendall(public_b.encode())
info_a = s.recv(1024).decode().split()
ea = int(info_a[0])
na = int(info_a[1])
#print (ea)
#print (na)

message_b = int(input('Enter message for server: '))
encrp_msg_b = str((message_b**private_b) % nb)

s.sendall(encrp_msg_b.encode())

message_a = int(s.recv(1024).decode())
print('Encrpyted message from server recieved: %d' %message_a)
final_msg = (int(message_a)**ea) % na
print('After decryption: %d' %final_msg)

# close the connection
s.close()  