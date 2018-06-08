
export default {
    // loading: './src/pages/PageLoadingComponent',
    plugins: [
        "umi-plugin-dva",
        [
            "umi-plugin-routes",
            {
                exclude: [
                    /model\.(j|t)sx?$/,
                    /service\.(j|t)sx?$/,
                    /models\//,
                    /components\//,
                    /services\//,
                ]
            }
        ],
    ]
}