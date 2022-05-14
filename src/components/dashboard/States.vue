<template>
    <vs-row>
        <vs-col w="2" class="m-5">
            <vs-card>
                <template #text>
                    <h4 class="mb-1">+70%</h4>
                    <span>Total Sales</span>
                    <vs-progress :percent="70" color="primary">primary</vs-progress>
                </template>
            </vs-card>
        </vs-col>
        <vs-col w="2" class="m-5">
            <vs-card>
                <template #text>
                    <h4 class="mb-1">-10%</h4>
                    <span>Monthly Sales</span>
                    <vs-progress :percent="10" color="danger">primary</vs-progress>
                </template>
                
            </vs-card>
        </vs-col>
        <vs-col w="2" class="m-5">
            <vs-card>
                <template #text>
                    <h4 class="mb-1">50%</h4>
                    <span>Yearly Sales</span>
                    <vs-progress :percent="50" color="success">primary</vs-progress>
                </template>
                
            </vs-card>
        </vs-col>
        <vs-col w="2" class="m-5">
            <vs-card>
                <template #text>
                    <h4 class="mb-1">30%</h4>
                    <span>Company Growth</span>
                    <vs-progress :percent="30" color="warning">primary</vs-progress>
                </template>
                
            </vs-card>
        </vs-col>
    </vs-row>    
</template>
<script>
export default {
    name: "States",
}
</script>