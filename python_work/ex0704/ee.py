import pandas as pd
import numpy as np

data = pd.DataFrame(
    {
        'timestamp':['00:00','00:10','00:20','00:30','00:40','00:50'],
        'temp':[22.0,np.nan,200.0,22.5,20,40]
    }
)

data = data.fillna(method='ffill')
# print(data)

mean_temp = data['temp'].mean()
print(f'mean_temp {mean_temp}')
std_temp = data['temp'].std()
print(f'std_temp {std_temp}')
def detect_outlier(x, mean, std):
    if abs(x - mean) > 2 * std:
        print(f"[이상치 탐지] 값 {x} → 평균 {mean:.2f}, 표준편차 {std:.2f} 기준 벗어남 → NaN 처리")
        return np.nan
    return x

data['temp'] = data['temp'].apply(lambda x: detect_outlier(x, mean_temp, std_temp))

# data['temp'] = data['temp'].apply(lambda x: np.nan if abs(x-mean_temp)>2* std_temp else x)

median_temp = data['temp'].median()
print(f'median_temp {median_temp}')

data['temp'].fillna(median_temp, inplace=True)

print(data)


