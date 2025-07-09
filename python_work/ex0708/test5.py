import pandas as pd
import matplotlib.pyplot as plt

data = pd.DataFrame({
    "id":[1,2,3,4,5],
    "diet_type":['A','B','A','B','A'],
    "weight_loss":[3.2,2.5,4.1,2.8,3.5]
})

print(data)

md = data.groupby('diet_type')['weight_loss'].mean().reset_index()
print(md)

mmd = md.sort_values(by='weight_loss',ascending=False)
print(mmd)
bars = plt.bar(mmd['diet_type'], mmd['weight_loss'], color='skyblue', edgecolor='black')

# plt.bar(mmd['diet_type'],mmd['weight_loss'])
plt.title('Average Weight Loss by Diet Type')
plt.xlabel('Diet Type')
plt.ylabel('Average Weight Loss (kg)')
plt.ylim(0, max(mmd['weight_loss']) + 1)  # y축 범위 여유 주기
plt.grid(axis='y', linestyle='--', alpha=0.7)

for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, height + 0.1, f'{height:.1f}',
             ha='center', va='bottom', fontsize=10)
plt.show()

import plotly.express as px
import pandas as pd

df = pd.DataFrame({
    'diet_type': ['A', 'B'],
    'weight_loss': [3.6, 2.6]
})

fig = px.bar(df, x='diet_type', y='weight_loss',
             title='Average Weight Loss by Diet Type',
             text='weight_loss',
             labels={'diet_type': 'Diet Type', 'weight_loss': 'Weight Loss (kg)'})
fig.update_traces(textposition='outside')
fig.update_layout(yaxis_range=[0, 5])
fig.show()