import pandas as pd

data = pd.DataFrame({
    "id":[1,2,3,4],
    "gender":['Male','FeMale','Male','FeMale']
})

print(data)

# data = data['gender'].apply(lambda x : 0 if x=='Male' else 1)
# print(data)

result8 = pd.get_dummies(data, columns=['gender'])
print(result8)