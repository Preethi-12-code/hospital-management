# Healthcare Sample Dataset

This project contains a small, fictional healthcare dataset for demonstration and analysis purposes.

## Contents

- **`patients.csv`** — Sample patient records
- **`analysis.py`** — Python script that loads the CSV and prints basic summary statistics

## Dataset: `patients.csv`

Contains 15 sample patient records with the following columns:

| Column           | Description                                  |
|------------------|-----------------------------------------------|
| `patient_id`     | Unique identifier for each patient            |
| `name`           | Patient's full name (fictional)               |
| `age`            | Patient's age in years                        |
| `gender`         | Patient's gender                              |
| `diagnosis`      | Primary diagnosis for the hospital visit      |
| `icd10_code`     | ICD-10 diagnosis code for the diagnosis       |
| `admission_date` | Date the patient was admitted                 |
| `discharge_date` | Date the patient was discharged               |
| `department`     | Hospital department that treated the patient  |

> **Note:** All data in this file is synthetic and generated for demonstration purposes only. It does not represent real patients or real medical records.

## Running the Analysis

Make sure you have Python 3 and `pandas` installed, then run:

```bash
pip install pandas
python analysis.py
```

The script will print:
- Total number of patients
- Average patient age
- Most common diagnosis
- Gender distribution
- Number of patients per department
- Average length of hospital stay
