

function yearFactory(yearFrom, yearTo = new Date().getFullYear()){
  var yearArray = []
  
  for (var i = yearTo; i >= yearFrom; i--) {
    yearArray.push({
      value: i.toString(),
      label: i.toString()
    })
  }
  return yearArray
}

const yachtTypeFormData = [
  {label: "Sailing Yacht", value: "Sailing Yacht"},
  {label: "Motor Yacht", value: "Motor Yacht"},
  {label: "Gulet Yacht", value: "Gulet Yacht"},
  {label: "Open Yacht", value: "Open Yacht"},
  {label: "Cruiser", value: "Cruiser"},
  {label: "Cabin Cruiser", value: "Cabin Cruiser"},
]

const SelectLanguageData = [
    {name: 'Polish', id:'1'},
    {name: 'English', id:'2'},
    {name: 'Italian', id:'3'},
    {name: 'German', id:'4'},
    {name: 'French', id:'5'},
    {name: 'Spanish', id:'6'},
    {name: 'Ukrainian', id:'7'},
    {name: 'Czech', id:'8'},
    {name: 'Greek', id:'9'},
    {name: 'Chinese', id:'10'}

]



module.exports = {
  yearFactory: yearFactory,
  yachtTypeData: yachtTypeFormData,
  LanguageSelector:SelectLanguageData
}