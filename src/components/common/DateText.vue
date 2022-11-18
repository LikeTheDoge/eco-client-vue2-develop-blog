<template>
    <span>{{text}}</span>
</template>

<script>
export default {
    props: {
        date: {
            default: () => null,
        },
        type: {
            default: "date",
        },
    },

    computed: {
        text() {
            if (!this.date) return "";

            if (this.type === "date") {
                return this.date.toLocaleDateString().replace(/\//g, "-");
            }

            if (this.type === "time") {
                return this.date.toLocaleTimeString();
            }

            if (this.type === "datetime") {
                return `${this.date
                    .toLocaleDateString()
                    .replace(/\//g, "-")} ${this.date.toLocaleTimeString()}`;
            }
        },
    },
};
</script>