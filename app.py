# =======================================================================
# PART A
# =======================================================================

import io
import streamlit as st
import pandas as pd
df = pd.read_csv('data/sales_predictions_2023_preprocessed.csv')


# Title
st.title("Prediction of Product Sales")

# Markdown headers
st.header("Product Sales Data")

# Display the dataframe
st.dataframe(df)

# Buttons
if st.button("Descriptive Statistics"):
  descriptive_stats = df.describe()
  st.dataframe(descriptive_stats)


if st.button("Summary Information"):
  buffer = io.StringIO()
  df.info(buf=buffer)
  summary_info = buffer.getvalue()
  st.text(summary_info)


# =======================================================================
# PART B
# =======================================================================


import matplotlib.pyplot as plt

if st.button("Null Values"):
  null_values = df.isnull().sum()
  st.write(null_values)

# Explore Column Plots
column_to_explore = st.selectbox("Select a column to explore", df.columns)
if column_to_explore:
  if df[column_to_explore].dtype == "object":
    st.bar_chart(df[column_to_explore].value_counts())
  else:
    fig, ax = plt.subplots()
    ax.scatter([1, 2, 3], [1, 2, 3])
    plt.hist(df[column_to_explore])
    st.pyplot(fig)

# Feature vs Target Plots
feature_to_explore = st.selectbox("Select a feature to explore", df.columns[:-1])

if feature_to_explore:
  if df[feature_to_explore].dtype == "object":
    st.bar_chart(df.groupby(feature_to_explore)["Item_Outlet_Sales"].mean())
  else:
    fig, ax = plt.subplots()
    ax.scatter([1, 2, 3], [1, 2, 3])
    plt.hist(df[column_to_explore])
    plt.scatter(df[feature_to_explore], df["Item_Outlet_Sales"])
    st.pyplot(fig)