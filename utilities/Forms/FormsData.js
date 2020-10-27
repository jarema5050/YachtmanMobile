

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


module.exports = {
    yearFactory: yearFactory,
    yachtTypeData: yachtTypeFormData
}