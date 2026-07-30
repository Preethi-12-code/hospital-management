"""
Healthcare Dataset Analysis
----------------------------
Loads patients.csv and prints basic summary statistics.

Usage:
    pip install pandas
    python analysis.py
"""

import pandas as pd


def load_data(filepath="patients.csv"):
    df = pd.read_csv(filepath, parse_dates=["admission_date", "discharge_date"])
    df["length_of_stay_days"] = (df["discharge_date"] - df["admission_date"]).dt.days
    return df


def print_summary(df):
    print("=" * 50)
    print("HEALTHCARE DATASET SUMMARY")
    print("=" * 50)

    print(f"\nTotal number of patients: {len(df)}")

    print(f"\nAverage age: {df['age'].mean():.1f} years")
    print(f"Youngest patient: {df['age'].min()} years")
    print(f"Oldest patient: {df['age'].max()} years")

    print("\nGender distribution:")
    print(df["gender"].value_counts().to_string())

    print("\nMost common diagnosis:")
    print(df["diagnosis"].value_counts().idxmax())

    print("\nDiagnosis breakdown:")
    print(df["diagnosis"].value_counts().to_string())

    print("\nICD-10 code breakdown:")
    print(df["icd10_code"].value_counts().to_string())

    print("\nPatients per department:")
    print(df["department"].value_counts().to_string())

    print(f"\nAverage length of stay: {df['length_of_stay_days'].mean():.1f} days")
    print(f"Longest stay: {df['length_of_stay_days'].max()} days")
    print(f"Shortest stay: {df['length_of_stay_days'].min()} days")

    print("\n" + "=" * 50)


if __name__ == "__main__":
    data = load_data()
    print_summary(data)
