let references = [
    {id: 1, name: 'Типы доходов', sysname: 'IncomeTypes', description: 'Справочник типов доходов'},
    {id: 2, name: 'Типы расходов', sysname: 'ExpenseTypes', description: 'Справочник типов расходов'},
    {id: 3, name: 'Марки автомобилей', sysname: 'CarBrands', description: 'Справочник марок автомобилей'},
    {id: 4, name: 'Модели автомобилей', sysname: 'CarModels', description: 'Справочник моделей автомобилей'}
]

let seq = 5

export const getRandomString = (req, res) => {

    let index = Math.floor(Math.random() * Math.floor(references.length));
    res.json(references[index].name);

}

export const getAll = (req, res) => {
    let foundedReferences = [];
    if(req.params.name != null || req.params.sysname != null) {
        foundedReferences = references.filter(s => s.name === req.params.name || s.sysname === req.params.sysname)
        res.status(200).json(foundedReferences)
    }
    else {
        res.status(200).json(references)
    }

}

export const create = (req, res) => {
    const newReference = {
        id: seq,
        ...req.body
    }
    seq++;
    references.push(newReference)
    res.status(201).json(newReference)
}

export const modify = (req, res) => {
    let updatedReference = {};
    for(let ref in references) {
       if(ref.id === req.params.id) {
           updatedReference = {
               ...req.body,
               id: req.params.id
           }
           ref = updatedReference
           break;
       }
    }
    res.status(200).json(updatedReference)
}

export const remove = (req, res) => {
    references = references.filter(s => s.id !== req.params.id)
    res.status(200).json({ message: 'Reference has been removed!'})
}
