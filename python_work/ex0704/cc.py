from sklearn.metrics import accuracy_score
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

cancer = load_breast_cancer()
# print(cancer)
x_train,x_test,y_train,y_test = train_test_split(cancer.data,cancer.target,test_size=0.2,random_state=42)

print(x_train.shape)
# print(x_train[:10])

rf = RandomForestClassifier(random_state=42)
rf.fit(x_train,y_train)

pred = rf.predict(x_test)

score = accuracy_score(y_test,pred)
print(score)