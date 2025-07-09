import numpy as np

aa = np.array([1,2,3,4,5,123])

print(aa)

aa = aa.reshape(-1,1)

print(aa.shape)
print(aa[:2])