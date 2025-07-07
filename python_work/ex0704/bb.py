import pandas as pd

data = pd.DataFrame({
    'region':['A','B','C'],
    'Income':[4500,5200,6000],
    'Spending':[4200,5000,6200]
})

corr = data[['Income','Spending']].corr().iloc[0,1]

result = '강한 양의 상관관계' if corr>0.7 else '상관관계가 약하거나 없음'
print(result)

print(data)