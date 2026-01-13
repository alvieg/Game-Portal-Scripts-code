const RequiredSheetId = "1s6P8wNS09MkBuJGGDjBcRYJXBeivoDGz97SrngtaQ5g"

function getActiveSheetId() {
  // Logger.log(SpreadsheetApp.getActiveSpreadsheet().getId())
  return SpreadsheetApp.getActiveSpreadsheet().getId()
}

function isCorrectSheetId() {
  //Logger.log(RequiredSheetId === getActiveSheetId())
  return RequiredSheetId === getActiveSheetId();
}
