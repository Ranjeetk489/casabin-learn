const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const path = require('path');


const createEnforcer = async () => {
    const adapter = await SequelizeAdapter.newAdapter({
        database: 'casbin',
        username: 'root',
        password: '5413',
        dialect: 'mysql',
        host: '127.0.0.1',
        port: '3306',
    });
    const enforcer = await casbin.newEnforcer(path.resolve("api/rbac/model.conf").replace(/\\/g, "/"), adapter);
    return enforcer;
}

const addPolicy = async (permission) => {
    const enforcer = await createEnforcer()
    await enforcer.addPolicy(...permission);
};


const deletePermission = async (permission) => {
    const enforcer = await createEnforcer();
    await enforcer.removePolicy(...permission);
};

const updatePermission = async (oldPermission, newPermission) => {
    const enforcer = await createEnforcer();
    await enforcer.removePolicy(...oldPermission);
    await enforcer.addPolicy(...newPermission);
};

const readPermissions = async () => {
    const enforcer = await createEnforcer();
    const permissions = await enforcer.getPolicy();
    return permissions;
};

const getPermissionsBySubject = async (subject) => {
    const enforcer = await createEnforcer();
    const permissions = await enforcer.getImplicitPermissionsForUser('group3');
    return permissions;
}



const addGroupingPolicy = async (groupingPolicy) => {
    const enforcer = await createEnforcer();
    await enforcer.addPolicy('group2', 'resource4');
    await enforcer.addPolicy('group3', 'resource6', 'write');
    const result = await enforcer.addGroupingPolicy('group3', 'group1');
    // console.log(result)
    return result
}

const getGroupingPolicy = async (user, group) => {
    const enforcer = await createEnforcer();
    const result = await enforcer.getFilteredNamedGroupingPolicy('g', 0, );
    console.log(result)
    return result
}

const hasPermission = async (subject, object, action) => {
    const enforcer = await createEnforcer();
    const hasPermission = await enforcer.enforce("group2", "resource1", "read");
    return hasPermission;
}



module.exports = {
    createEnforcer,
    addPolicy,
    deletePermission,
    updatePermission,
    readPermissions,
    getPermissionsBySubject,
    addGroupingPolicy,
    getGroupingPolicy,
    hasPermission
}