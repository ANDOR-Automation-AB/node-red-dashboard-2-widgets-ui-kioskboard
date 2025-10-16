<template>
    <input 
        :class="`kioskboard-input-${id}`" 
        :value="value ?? ''"
        data-kioskboard-type="keyboard" 
        data-kioskboard-placement="bottom" 
        data-kioskboard-specialcharacters="false" 
        placeholder="Test input" />
</template>

<script>
    export default {
        name: "UIKioskboard",
        inject: ['$dataTracker', '$socket'],
        props: {
            id:    { type: String, required: true      },
            props: { type: Object, default: () => ({}) },
            state: { type: Object, default: () => ({ enabled: false, visible: false }) }
        },
        data() { 
            return { 
                base: null,
                msg: null,
                value: ''
            }
        },
        created() { 
            this.$dataTracker(this.id, this.onInput, this.onLoad); 
        },
        methods: {
            onInput(msg) { 
                this.msg = msg;
                this.value = msg?.payload;
            },
            onLoad(msg, base) {
                this.base = base;
                this.msg  = msg; 
                this.value = msg?.payload;
            }
        },
        mounted() {
            const author = '@andor-automation';
            const widget = 'node-red-dashboard-2-widgets-ui-kioskboard';
            const kioskboardfile = 'kioskboard-aio-2.3.0.min.js';
            const script = document.createElement("script");
            script.src = `/resources/${author}/${widget}/vendor/${kioskboardfile}`;
            script.async = true;
            script.onload = () => {
                const selector = `.kioskboard-input-${this.id}`;
                KioskBoard.run(selector, {
                    keysArrayOfObjects: this.props.keysArrayOfObjects && JSON.parse(this.props.keysArrayOfObjects),
                    keysSpecialCharsArrayOfStrings: this.props.keysSpecialCharsArrayOfStrings && JSON.parse(this.props.keysSpecialCharsArrayOfStrings),
                    keysNumpadArrayOfNumbers: this.props.keysNumpadArrayOfNumbers && JSON.parse(this.props.keysNumpadArrayOfNumbers),
                    theme: this.props.theme,
                    autoScroll: this.props.autoScroll,
                    capsLockActive: this.props.capsLockActive,
                    allowRealKeyboard: this.props.allowRealKeyboard,
                    allowMobileKeyboard: this.props.allowMobileKeyboard,
                    cssAnimations: this.props.cssAnimations,
                    cssAnimationsDuration: this.props.cssAnimationsDuration,
                    cssAnimationsStyle: this.props.cssAnimationsStyle,
                    keysAllowSpacebar: this.props.keysAllowSpacebar,
                    keysSpacebarText: this.props.keysSpacebarText,
                    keysFontFamily: this.props.keysFontFamily,
                    keysFontSize: this.props.keysFontSize,
                    keysFontWeight: this.props.keysFontWeight,
                    keysIconSize: this.props.keysIconSize,
                    keysEnterText: this.props.keysEnterText,
                    keysEnterCallback: () => {
                        const value = document.querySelector(selector).value;
                        this.$socket.emit('widget-send', this.id, { 
                            topic: this.msg.topic, payload: value 
                        });
                    },
                    keysEnterCanClose: this.props.keysEnterCanClose
                });
            }
            document.head.appendChild(script);
        }
    }
</script>