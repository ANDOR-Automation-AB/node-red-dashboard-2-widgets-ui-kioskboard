module.exports = function(RED) {
    function KioskboardNode(config) {
        RED.nodes.createNode(this, config)

        const node = this
        const group = RED.nodes.getNode(config.group)
        const base = group.getBase()

        const evts = {
            onAction: true,
            onInput: function (msg, send, done) {
                base.stores.data.save(base, node, msg)
                if (done) done()
            }
        }
        if (group) group.register(node, config, evts)
    }
    RED.nodes.registerType('ui-kioskboard', KioskboardNode)
}