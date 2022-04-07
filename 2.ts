import * as fs from "fs";

interface TransactionData {
  date: string; // DD-MM. No year value. Also for some reason the MM value starts from 0. So January is 0 and December is 11.
  amount: string; // Need to remove commas.
  description: string; // There are commas, so need to add quotes.
}

async function getTransactions(
  fromDate: string,
  toDate: string,
  outputCsvFileName: string
) {
  if (Date.parse(fromDate) > Date.parse(toDate)) {
    console.log("From date is greater than to date.");
    return;
  }

  const url = "https://hiring-ld-takehome.herokuapp.com/transactions";

  const res = await fetch(`${url}?fromDate=${fromDate}&toDate=${toDate}`);

  // If response is valid, write the data to csv.
  if (res.ok) {
    const writeStream = fs.createWriteStream(`./${outputCsvFileName}.csv`);
    writeStream.write("Date,Amount,Description\n");
    const data: { data: TransactionData[] } = await res.json();

    const fromYear = fromDate.substring(0, 4);
    let currentYear = Number(fromYear);
    let prevMonth = 0;
    data.data.forEach(({ date, amount, description }) => {
      const newLine = [];
      const dateArr = date.split("-");
      const day = dateArr[0];
      const month = Number(dateArr[1]) + 1;

      // If the month is less than previous month, then it means we are in a new year.
      if (month < prevMonth) {
        currentYear++;
      }
      prevMonth = month;

      const dateText = `${currentYear}-${month}-${day}`;
      newLine.push(dateText);
      const amountText = amount.replace(",", "");
      newLine.push(amountText);
      const descriptionText = `'${description}'`;
      newLine.push(descriptionText);
      writeStream.write(newLine.join(",") + "\n");
    });

    writeStream.end();
    writeStream
      .on("finish", () => {
        console.log("Finished.");
      })
      .on("error", (err) => {
        console.log(err);
      });
  } else {
    // If response is not valid, print the status and status text.
    console.log(res.status, res.statusText);
    console.log("Too many transactions");
  }
}

// Should work.
getTransactions("2022-01-01", "2022-01-31", "transactions");

// Should work. Checking when the toDate is in a new year.
getTransactions("2021-12-01", "2022-01-05", "transactions2");

// Should not work because of too many transactions.
getTransactions("2022-01-01", "2022-02-30", "transactions3");

// Should not work because from date is greater than to date.
getTransactions("2022-12-01", "2022-01-31", "transactions4");

// Should not work because of too many transactions.
getTransactions("2021-12-01", "2022-01-31", "transactions5");
