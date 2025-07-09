import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data = pd.DataFrame({
    'dept':['A','A','B','B','B'],
    'name':['Alice','Bob','Carol','David','Evan'],
    'salary':[5000,5500,4800,5200,5100]
})

print(data)

data1 = data.groupby('dept')['salary']

for group, values in data1:
    print(group)
    print(values)
    
print(data1.mean())
print(data1.median())

data2 = data.groupby('dept')['salary'].agg(['mean','median']).reset_index()
print(data2)
