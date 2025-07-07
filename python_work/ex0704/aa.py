import pandas as pd
import numpy as np

# customerId = ['0001','0002','0003']
# tenure = [1,34,2]
# MonthlyCharges= [29.85,56.95,53.85]
# TotalCharges= np.array([29.85,1889.5,])
# Churn=['Yes','No','Yes']


data = pd.DataFrame({
    'customerId':['0001','0002','0003'],
    'tenure':[1,34,2],
    'MonthlyCharges':[29.85,56.95,53.85],
    'TotalCharges': np.array([29.85,1889.5,'']),
    'Churn':['Yes','No','Yes']
})

data['TotalCharges'] = pd.to_numeric(data['TotalCharges'])
# print(total)
median_total_charges = data['TotalCharges'].median()

data['TotalCharges'].fillna(median_total_charges,inplace=True)

print(data)