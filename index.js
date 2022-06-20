/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (delKeys = [], entries = []) => {
    if (!delKeys || delKeys.length == 0) {
        return entries;
    }
    return entries.map(item => {
        delKeys.forEach(key => delete item[key]);
        return item;
    });
};

exports.excludeByProperty = (delKey, entries = []) => {
    if (!delKey) {
        return entries;
    }
    return entries.filter(item => {
        return !Object.keys(item).includes(delKey);
    });
};

exports.sumDeep = (entries = []) => {
    return entries.map(item => ({
        objects: item.objects.reduce((pre, cur) => pre + (cur.val || 0), 0)
    }))
};

exports.applyStatusColor = (colorCode = {}, entries = []) => {
    let codeToColor = {};
    Object.keys(colorCode).forEach(key => {
        colorCode[key].forEach(code => {
            codeToColor[code] = key;
        });
    });
    return entries.reduce((pre, cur) => {
        let color = codeToColor[cur.status];
        if (!!color) pre.push(Object.assign(cur, { color }));
        return pre;
    }, [])
};

exports.createGreeting = (greeter = () => { }, greeting) => {
    return (personsName) => greeter(greeting, personsName);
};

exports.setDefaults = (defaultParame = {}) => {
    // return (entries = {}) => ({ ...defaultParame, ...entries }); 最简单做法
    return (entries = {}) => {
        let entriesKeys = Object.keys(entries);
        Object.keys(defaultParame).forEach(key => {
            if (!entriesKeys.includes(key)) {
                entries[key] = defaultParame[key];
            }
        });
        return entries;
    }
};

exports.fetchUserByNameAndUsersCompany = async (name = '', services) => {
    let users = await services.fetchUsers();
    let status = await services.fetchStatus();
    let user = users.filter(user => user.name == name)[0];
    let company = await services.fetchCompanyById(user.companyId);

    return {
        company: company,
        status,
        user,
    }
};
