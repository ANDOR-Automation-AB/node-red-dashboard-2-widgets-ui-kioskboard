<template>
    <input 
        class="kiosk-input" 
        data-kioskboard-type="keyboard" 
        data-kioskboard-placement="bottom" 
        data-kioskboard-specialcharacters="false" 
        placeholder="Test input" />
</template>

<script>
    export default {
        name: "UIKioskinput",
        inject: ['$dataTracker'],
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
            const file = 'kioskboard-aio-2.3.0.min.js';
            const script = document.createElement("script");
            script.src = `/resources/${author}/${widget}/vendor/${file}`;
            script.async = true;
            script.onload = () => {
                KioskBoard.run('.kiosk-input', {
                    keysArrayOfObjects: [
                        { 0: "1", 1: "2", 2: "3" },
                        { 0: "4", 1: "5", 2: "6" },
                        { 0: "7", 1: "8", 2: "9" },
                        { 0: ".", 1: "0", 2: "←" }
                    ]
                });
            }
            document.head.appendChild(script);
        },
        methods: {
            onInput(msg) { this.msg = msg; },
            onLoad(msg)  {this.msg  = msg; }
        }
    }
</script>