<template>
    <v-row>
        <v-col :cols="gap" class="d-flex flex-start align-center">
            <p>{{ label }}</p>
        </v-col>
        <v-col :cols="12 - gap">
            <input
                :class="`kioskboard-input-${id}`" 
                :value="value ?? ''"
                :data-kioskboard-type="dataKioskboardType" 
                data-kioskboard-placement="bottom" 
                :data-kioskboard-specialcharacters="dataKioskboardSpecialcharacters" 
                :placeholder="label" />
        </v-col>
    </v-row>
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
        computed: {
            dataKioskboardType: function () {
                return this.getProperty('dataKioskboardType')
            },
            dataKioskboardSpecialcharacters: function () {
                return this.getProperty('dataKioskboardSpecialcharacters')
            },
            label: function () {
                return this.getProperty('label')
            },
            gap: function () { 
                let val = Number(this.getProperty('gap')) || 4;
                if (val > 12) val = 12
                if (val < 1)  val = 1;
                return val
            }            
        },
        methods: {
            onInput(msg) { 
                this.msg = msg;
                let value = msg?.inputValue ?? msg?.payload ?? '';
                if (this.props.scale && !isNaN(value) && value !== "" && value !== null) {
                    value = Number(value) / Number(this.props.scale);
                }
                this.value = value;
            },
            onLoad(msg, base) {
                this.base = base;
                this.msg  = msg; 
                let value = msg?.inputValue ?? msg?.payload ?? '';
                if (this.props.scale && !isNaN(value) && value !== "" && value !== null) {
                    value = Number(value) / Number(this.props.scale);
                }
                this.value = value;
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
                const input = document.querySelector(selector);
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
                        let value = document.querySelector(selector).value;
                        const input = value;
                        if (!isNaN(value) && value.trim() !== "") {
                            value = Number(value) * Number(this.props.scale || 1);
                        }
                        this.$socket.emit('widget-send', this.id, { 
                            topic: this.msg?.topic || this.props.topic || undefined,
                            payload: value,
                            inputValue: input
                        });
                    },
                    keysEnterCanClose: this.props.keysEnterCanClose
                });
                window.addEventListener('keyup', (ev) => {
                    if (ev.key === 'Enter') {
                        const board = document.querySelector('#KioskBoard-VirtualKeyboard');
                        if (!board) return;
                        ev.preventDefault();
                        let value = document.querySelector(selector).value;
                        const input = value;
                        if (!isNaN(value) && value.trim() !== "") {
                            value = Number(value) * Number(this.props.scale || 1);
                        }
                        this.$socket.emit('widget-send', this.id, { 
                            topic: this.msg?.topic || this.props.topic || undefined,
                            payload: value,
                            inputValue: input
                        });
                        if (board) {
                            if (board.classList.contains('kioskboard-fade')) {
                                board.classList.add('kioskboard-fade-remove');
                            }
                            else if (board.classList.contains('kioskboard-slide')) {
                                board.classList.add('kioskboard-slide-remove');
                            }
                            setTimeout(() => {
                                board.remove();
                                document.body.classList.remove('kioskboard-body-padding');
                            }, 360);
                        }
                        document.querySelector(selector).blur();
                    }
                });
            }
            document.head.appendChild(script);
        }
    }
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #555;
  border-radius: 0.50rem;
  background-color: #FFF;
  font-size: 1rem;
  outline: none;
}
</style>