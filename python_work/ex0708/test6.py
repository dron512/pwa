import pandas as pd
import plotly.express as px

# 데이터 준비
data = pd.DataFrame({
    "id": [1, 2, 3, 4, 5],
    "diet_type": ['A', 'B', 'A', 'B', 'A'],
    "weight_loss": [3.2, 2.5, 4.1, 2.8, 3.5]
})

# 그룹별 평균
md = data.groupby('diet_type')['weight_loss'].mean().reset_index()

# 그래프 생성
fig = px.bar(
    md,
    x='diet_type',
    y='weight_loss',
    text='weight_loss',
    title='💪 Average Weight Loss by Diet Type',
    labels={'diet_type': 'Diet Type', 'weight_loss': 'Avg Weight Loss (kg)'},
    color='diet_type',
    color_discrete_sequence=['#76b5c5', '#f4a261']  # 사용자 정의 컬러
)

# 트레이스 (막대) 스타일
fig.update_traces(
    texttemplate='<b>%{text:.2f} kg</b>',
    textposition='outside',
    marker_line_color='black',
    marker_line_width=1.5
)

# 전체 레이아웃 조정
fig.update_layout(
    yaxis_range=[0, md['weight_loss'].max() + 1],
    plot_bgcolor='white',
    font=dict(family='Arial', size=14),
    margin=dict(l=50, r=30, t=60, b=40),
    showlegend=False,
    bargap=0.3,
    title_font=dict(size=20, color='#333'),
)

# 저장
fig.write_html("diet_chart.html")
