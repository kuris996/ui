import { stringify } from 'qs'
import request from '@/utils/request'

/*
    FOB
*/
export async function queryFob(params) {
    return request(`/api/fob?${stringify(params)}`)
}

export async function removeFob(params) {
    return request('/api/fob', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addFob(params) {
    return request('/api/fob', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateFob(params) {
    return request('/api/fob', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    logistics
*/

export async function queryLogistics(params) {
    return request(`/api/logistics?${stringify(params)}`)
}

export async function removeLogistics(params) {
    return request('/api/logistics', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addLogistics(params) {
    return request('/api/logistics', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateLogistics(params) {
    return request('/api/logistics', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    consignee
*/

export async function queryConsignee(params) {
    return request(`/api/consignee?${stringify(params)}`)
}

export async function removeConsignee(params) {
    return request('/api/consignee', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addConsignee(params) {
    return request('/api/consignee', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateConsignee(params) {
    return request('/api/consignee', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    region
*/

export async function queryRegion(params) {
    return request(`/api/region?${stringify(params)}`)
}

export async function removeRegion(params) {
    return request('/api/region', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addRegion(params) {
    return request('/api/region', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateRegion(params) {
    return request('/api/region', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    perevalka_upakovka
*/

export async function queryPerevalkaUpakovka(params) {
    return request(`/api/perevalka_upakovka?${stringify(params)}`)
}

export async function removePerevalkaUpakovka(params) {
    return request('/api/perevalka_upakovka', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addPerevalkaUpakovka(params) {
    return request('/api/perevalka_upakovka', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updatePerevalkaUpakovka(params) {
    return request('/api/perevalka_upakovka', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    factory
*/

export async function queryFactory(params) {
    return request(`/api/factory?${stringify(params)}`)
}

export async function removeFactory(params) {
    return request('/api/factory', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addFactory(params) {
    return request('/api/factory', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateFactory(params) {
    return request('/api/factory', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    holding
*/

export async function queryHolding(params) {
    return request(`/api/holding?${stringify(params)}`)
}

export async function removeHolding(params) {
    return request('/api/holding', {
        method: 'POST',
        data: {
            ...params,
            method: 'remove',
        },
    });
}

export async function addHolding(params) {
    return request('/api/holding', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        }
    });
}

export async function updateHolding(params) {
    return request('/api/holding', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        }
    })
}

/*
    task
*/

export async function addTask(params) {
    return request('/api/task', {
        method: 'POST',
        data: {
            ...params,
            method: 'add',
        },
    });
}

export async function queryTask(params) {
    return request(`/api/task?${stringify(params)}`)
}

/*
    login
*/

export async function accountLogin(params) {
    return request(`/api/login/account`, {
        method: 'POST',
        data: params,
    });
}
