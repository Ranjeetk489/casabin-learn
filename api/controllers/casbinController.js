const casbinServices = require('../rbac/index.js');


async function addPermission(req, res) {
    const { sub, obj, act } = req.body;

    try {
        await casbinServices.addPolicy([sub, obj, act]);
        res.status(200).json({ message: 'Permission added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserPermissions(req, res) {
    const { sub } = req.params;
    try {
        const permissions = await casbinServices.getPermissionsBySubject()
        res.status(200).json({ permissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addGroupPolicy(req, res) {
    const { sub, obj, act } = req.body;

    try {
        await casbinServices.addGroupingPolicy([sub, obj, act]);
        res.status(200).json({ message: 'Permission added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    addPermission,
    getUserPermissions,
    addGroupPolicy
}
