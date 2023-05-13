const DataToInt = data => {
    const dataToInt = parseInt(data);

    return isNaN(dataToInt) ? data : dataToInt;
}

export const mapFineToSave = fineData => {
    return {
        severity: DataToInt(fineData.severity),
        status: fineData.status
    };
}

export const mapDriverToSave = fineData => {
    return {
        fullname: fineData.fullname,
        birth_date: fineData.birthday,
        drive_license: fineData.license,
        criminal: fineData.criminal
    };
}

export const mapEmployeeToSave = fineData => {
    return {
        fullname: fineData.fullname,
        birth_date: fineData.birthday,
        contract_number: fineData.contract,
        phone_number: fineData.phone,
        position_id: DataToInt(fineData.position),
        rank_id: DataToInt(fineData.rank)
    };
}

export const mapHijackingToSave = fineData => {
    return {
        incident_date: fineData.incidentDate,
        relevance: fineData.relevance,
        owner_id: DataToInt(fineData.owner),
        employee_id: DataToInt(fineData.employee),
        car_id: DataToInt(fineData.car)
    };
}

export const mapInterceptionToSave = fineData => {
    return {
        begin_date: fineData.begin,
        end_date: fineData.end,
        status: fineData.status,
        hijacker_fullname: fineData.hijacker,
        claim_id: DataToInt(fineData.claim),
        video_id: DataToInt(fineData.video)
    };
}

export const mapPositionToSave = fineData => {
    return {
        name: fineData.name,
        description: fineData.description,
        salary: fineData.salary
    };
}

export const mapProtocolToSave = fineData => {
    return {
        reg_date: fineData.registration,
        status: fineData.status,
        violator_id: DataToInt(fineData.violator),
        victim_id: DataToInt(fineData.victim)
    };
}

export const mapProtocolPositionToSave = fineData => {
    return{
        description: fineData.description,
        protocol_id: fineData.protocol,
        video_id: fineData.video,
        fine_id: fineData.fine
    };
}

export const mapVideoToSave = fineData => {
    return {
        video_date: fineData.date,
        video_time: fineData.time,
        victims_car_number: fineData.victimCarNumber,
        violators_car_number: fineData.violatorCarNumber
    };
}

export default {
    mapProtocolPositionToSave,
    mapFineToSave,
    mapDriverToSave,
    mapEmployeeToSave,
    mapHijackingToSave,
    mapVideoToSave,
    mapProtocolToSave,
    mapPositionToSave,
    mapInterceptionToSave
}