import pandas as pd


data = pd.DataFrame(
    {
        'date':['2023-06-01','2023-06-01','2023-06-01','2023-06-02'],
        'product':['A','B','A','B'],
        'sales':[10,5,12,30]
    }
)

data['date'] = pd.to_datetime(data['date'])

june_data = data[data['date'].dt.month ==6]
print(data['date'].dt.month ==6)
print(data[data['date'].dt.month ==6])

avg = june_data.groupby('date')['sales'].mean().reset_index()
print(june_data.groupby('date')['sales'])
print(data.groupby(['date', 'product'])['sales'].sum())

print(data)