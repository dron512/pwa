import pandas as pd

df = pd.read_csv("채용정보.csv")
grouped = df.groupby("아파트명").size().reset_index(name="공고수")
grouped = grouped.sort_values("공고수", ascending=False)
print(grouped)
grouped.to_csv("채용정보그룹.csv", index=False, encoding="utf-8-sig")
