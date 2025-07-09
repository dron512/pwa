a = [1,2,3,4,5]
b = [4,5,6,7,8]

print(len(a))

# python 
# flask -> html,css, javascript
# numpy pandas matplotlib
# ml dl

import numpy as np 

na = np.array([1,2,3,4,5])
nb = np.array([4,5,6,7,8])

print(len(nb))
print(nb.shape)

# 슬라이싱
print(a[:3])
print(na[:2])

print(a+b)
print(na+nb)

# print(a*b) # 기본 배열은 파이썬에서 행열 곱셉 허용 X
print(na*nb) # numpy 배열은 파이썬에서 행열 곱을 허용 O