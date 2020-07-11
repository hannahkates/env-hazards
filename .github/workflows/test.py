for i in range (1,101):
	if (i%3 == 0) & (i%5 == 0):
		print('CracklePop')
	elif (i%3 == 0):
		print('Crackle')
	elif (i%5 == 0):
		print('Pop')
	else:
		print(i)

logging.info()