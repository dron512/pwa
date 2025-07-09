import pandas as pd

data1 = pd.DataFrame({
    "customer_id":[1,2,3],
    "name":['Alice','Bob','Carol']
})

data2 = pd.DataFrame({
    "customer_id":[1,2,3],
    "amount":[120,90,200]
})

mdata = pd.merge(data1,data2,on='customer_id')

pdata = mdata.get(mdata['amount']>=100)
print(pdata)

print(mdata[mdata['amount']>=100])