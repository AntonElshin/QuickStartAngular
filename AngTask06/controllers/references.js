/*let references = [
    {id: 1, name: 'Типы доходов', sysname: 'IncomeTypes', description: 'Справочник типов доходов'},
    {id: 2, name: 'Типы расходов', sysname: 'ExpenseTypes', description: 'Справочник типов расходов'},
    {id: 3, name: 'Марки автомобилей', sysname: 'CarBrands', description: 'Справочник марок автомобилей'},
    {id: 4, name: 'Модели автомобилей', sysname: 'CarModels', description: 'Справочник моделей автомобилей'}
]*/

let references = [
    {id: 1, name: 'ref name 1', sysname: 'refsysname1', description: 'description 1'},
    {id: 2, name: 'ref name 2', sysname: 'refsysname2', description: 'description 2'},
    {id: 3, name: 'ref name 3', sysname: 'refsysname3', description: 'description 3'},
    {id: 4, name: 'ref name 4', sysname: 'refsysname4', description: 'description 4'},
    {id: 5, name: 'ref name 5', sysname: 'refsysname5', description: 'description 5'},
    {id: 6, name: 'ref name 6', sysname: 'refsysname6', description: 'description 6'},
    {id: 7, name: 'ref name 7', sysname: 'refsysname7', description: 'description 7'},
    {id: 8, name: 'ref name 8', sysname: 'refsysname8', description: 'description 8'},
    {id: 9, name: 'ref name 9', sysname: 'refsysname9', description: 'description 9'},
    {id: 10, name: 'ref name 10', sysname: 'refsysname10', description: 'description 10'},
    {id: 11, name: 'ref name 11', sysname: 'refsysname11', description: 'description 11'},
    {id: 12, name: 'ref name 12', sysname: 'refsysname12', description: 'description 12'},
    {id: 13, name: 'ref name 13', sysname: 'refsysname13', description: 'description 13'},
    {id: 14, name: 'ref name 14', sysname: 'refsysname14', description: 'description 14'},
    {id: 15, name: 'ref name 15', sysname: 'refsysname15', description: 'description 15'}
]



let seq = 16

export const getRandomString = (req, res) => {

    let index = Math.floor(Math.random() * Math.floor(references.length));
    res.json(references[index].name);

}

export const getAll = (req, res) => {

    let filterName = req.params.name;
    let filterSysname = req.params.sysname;
    let filterPage = req.params.page || 0;
    let size = 10;

    // заполняем фильтры
    for(const key in req.query) {
        if (key === 'name' && req.query[key] !== null) {
            filterName = req.query[key];
        }
        else if (key === 'sysname' && req.query[key] !== null) {
            filterSysname = req.query[key]
        }
        else if (key === 'page' && req.query[key] !== null) {
            filterPage = req.query[key];
        }
    }

    console.log('filterName', filterName);
    console.log('filterSysname', filterSysname);
    console.log('filterPage', filterPage);

    //применяем фильтр по name и сиснейм
    let foundedReferences = [];
    if (filterName !== undefined && filterSysname !== undefined) {
        foundedReferences = references.filter(s => s.name.toLowerCase().indexOf(filterName.toLowerCase()) != -1 && s.sysname.toLowerCase().indexOf(filterSysname.toLowerCase()) != -1)
    }
    else if (filterName === undefined && filterSysname !== undefined) {
        foundedReferences = references.filter(s => s.sysname.toLowerCase().indexOf(filterSysname.toLowerCase()) != -1)
    }
    else if(filterName !== undefined && filterSysname === undefined) {
        foundedReferences = references.filter(s => s.name.toLowerCase().indexOf(filterName.toLowerCase()) != -1)
    }
    else {
        foundedReferences = references;
    }

    //пейджинг
    let paggingReferences = [];
    let count = 0;

    if(filterPage * 10 < foundedReferences.length) {
        for (let i = filterPage * 10; i < foundedReferences.length && count < size; i++) {
            count++;
            paggingReferences.push(foundedReferences[i]);
        }
    }

    let totalPages = parseInt(foundedReferences.length/10) + 1;

    let response = {
        content: paggingReferences,
        pageable:{
            sort:{
                sorted:false,
                unsorted:true,
                empty:true
            },
            offset:0,
            pageSize:10,
            pageNumber:0,
            paged:true,
            unpaged:false
        },
        last:false,
        totalPages:totalPages,
        totalElements:foundedReferences.length,
        size:size,
        number:filterPage,
        sort:{
            sorted:false,
            unsorted:true,
            empty:true
        },
        first:true,
        numberOfElements:10,
        empty:false
    }

    res.status(200).json(response)

}

export const getById = (req, res) => {

    let reference = references.filter(s => s.id === +req.params.id)
    console.log("foundReference", reference)
    if(reference.length == 1) {
        res.status(200).json(reference[0])
    }
    else {
        res.status(404).json({ message: 'Not found!'})
    }
}

export const create = (req, res) => {
    const newReference = {
        id: seq,
        ...req.body
    }
    seq += 1;
    references.push(newReference)
    res.status(201).json(newReference)
}

export const modify = (req, res) => {
    let reference = references.filter(s => s.id === +req.params.id)
    if(reference.length == 1) {
        let updatedReference = {};
        for (let i = 0; i < references.length; i++) {
            let ref = references[i];
            if (ref.id === +req.params.id) {
                updatedReference = {
                    ...req.body,
                    id: +req.params.id
                }
                references[i] = updatedReference
                break;
            }
        }
        res.status(200).json(updatedReference)
    }
    else {
        res.status(404).json({ message: 'Not found!'})
    }
}

export const remove = (req, res) => {
    let reference = references.filter(s => s.id === +req.params.id)
    if(reference.length == 1) {
        references = references.filter(s => s.id !== +req.params.id)
        res.status(200).json({ message: 'Reference has been removed!'})
    }
    else {
        res.status(404).json({ message: 'Not found!'})
    }

}

export const checkSysname = (req, res) => {
    console.log('In checkSysname')
    console.log('req', req)
    let reference = references.filter(s => s.sysname === req.params.sysname)
    if(reference.length == 1) {
        res.status(200).json(reference)
    }
    else {
        res.status(200).json()
    }
}
