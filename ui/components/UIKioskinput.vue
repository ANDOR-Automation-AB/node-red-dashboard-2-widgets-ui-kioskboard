<template>
    <input 
        :class="`kiosk-input-${id}`" 
        data-kioskboard-type="keyboard" 
        data-kioskboard-placement="bottom" 
        data-kioskboard-specialcharacters="false" 
        placeholder="Test input" />
</template>

<script>
    export default {
        name: "UIKioskinput",
        inject: ['$dataTracker', '$socket'],
        props: {
            id:    { type: String, required: true      },
            props: { type: Object, default: () => ({}) },
            state: { type: Object, default: () => ({ enabled: false, visible: false }) }
        },
        data() { return { msg: null }},
        created() { this.$dataTracker(this.id, this.onInput, this.onLoad); },
        mounted() {
            const author = '@andor-automation';
            const widget = 'node-red-dashboard-2-widgets-ui-kioskinput';
            const kioskboardfile = 'kioskboard-aio-2.3.0.min.js';
            const script = document.createElement("script");
            script.src = `/resources/${author}/${widget}/vendor/${kioskboardfile}`;
            script.async = true;
            script.onload = () => {
                const selector = `.kiosk-input-${this.id}`;
                KioskBoard.run(selector, {
                    keysArrayOfObjects: this.props.keys ? JSON.parse(this.props.keys) : null,
                    keysSpecialCharsArrayOfStrings: this.props.special ? JSON.parse(this.props.special) : null,
                    keysNumpadArrayOfNumbers: this.props.keysNumpadArrayOfNumbers ? JSON.parse(this.props.keysNumpadArrayOfNumbers) : null,
                    theme: this.props.theme,
                    autoScroll: this.props.autoscroll,
                    capsLockActive: this.props.capslock,
                    allowRealKeyboard: this.props.keyboard,
                    allowMobileKeyboard: this.props.mobile,
                    cssAnimations: this.props.animate,
                    cssAnimationsDuration: this.props.duration,
                    cssAnimationsStyle: this.props.animation,
                    keysAllowSpacebar: this.props.spacebar,
                    keysSpacebarText: this.props.spacebartext,
                    keysFontFamily: this.props.font,
                    keysFontSize: this.props.fontsize,
                    keysFontWeight: this.props.weight,
                    keysIconSize: this.props.iconsize,
                    keysEnterText: this.props.returntext,
                    keysEnterCallback: () => {
                        const value = document.querySelector(selector).value;
                        this.$socket.emit('widget-change', this.id, { topic: this.msg?.topic, payload: value });
                    },
                    keysEnterCanClose: this.props.keysEnterCanClose
                });
            }
            document.head.appendChild(script);
        },
        methods: {
            onInput(msg) { 
                this.msg = msg;
                this.msg.topic = msg.topic;
                const input = document.querySelector(`.kiosk-input-${this.id}`);
                if (input) input.value = msg.payload ?? "";
            },
            onLoad(msg)  {this.msg  = msg; }
        }
    }
</script>