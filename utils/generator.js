// export const colorGenerator = () => {return ('#'+Math.floor(Math.random()*16777215).toString(16))}

export const colorGenerator = () => {
    const colors = ['#446e5c',  '#1a3e59',  '#7dc383',  '#f7c86c',  '#4b8e8d',  '#ffb8b8',  '#84b1b7',  '#a15937',  '#f7c86c',  '#e1c698',  '#362a21',  '#da8436']
    return colors[Math.floor(Math.random()*colors.length)]
}