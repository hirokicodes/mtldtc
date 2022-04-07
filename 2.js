"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
function getTransactions(fromDate, toDate, outputCsvFileName) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res, writeStream_1, data, fromYear, currentYear_1, prevMonth_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Date.parse(fromDate) > Date.parse(toDate)) {
                        console.log("From date is greater than to date.");
                        return [2 /*return*/];
                    }
                    url = "https://hiring-ld-takehome.herokuapp.com/transactions";
                    return [4 /*yield*/, fetch("".concat(url, "?fromDate=").concat(fromDate, "&toDate=").concat(toDate))];
                case 1:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 3];
                    writeStream_1 = fs.createWriteStream("./".concat(outputCsvFileName, ".csv"));
                    writeStream_1.write("Date,Amount,Description\n");
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    fromYear = fromDate.substring(0, 4);
                    currentYear_1 = Number(fromYear);
                    prevMonth_1 = 0;
                    data.data.forEach(function (_a) {
                        var date = _a.date, amount = _a.amount, description = _a.description;
                        var newLine = [];
                        var dateArr = date.split("-");
                        var day = dateArr[0];
                        var month = Number(dateArr[1]) + 1;
                        // If the month is less than previous month, then it means we are in a new year.
                        if (month < prevMonth_1) {
                            currentYear_1++;
                        }
                        prevMonth_1 = month;
                        var dateText = "".concat(currentYear_1, "-").concat(month, "-").concat(day);
                        newLine.push(dateText);
                        var amountText = amount.replace(",", "");
                        newLine.push(amountText);
                        var descriptionText = "'".concat(description, "'");
                        newLine.push(descriptionText);
                        writeStream_1.write(newLine.join(",") + "\n");
                    });
                    writeStream_1.end();
                    writeStream_1
                        .on("finish", function () {
                        console.log("Finished.");
                    })
                        .on("error", function (err) {
                        console.log(err);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    // If response is not valid, print the status and status text.
                    console.log(res.status, res.statusText);
                    console.log("Too many transactions");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
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
