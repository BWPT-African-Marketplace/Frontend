import styled from 'styled-components'

const FormStyle = styled.section`
    width:50%;
    margin: 3rem auto;
    h2{
        font-size: 1.8rem;
        color: #E84C3D;
        font-weight:700;
        text-align:left;
    }
    form{
        display:flex;
        flex-flow: column nowrap;
        background-color:#E84C3D;
        font-size:1.5rem;

        label{
            color:#f3f3f3;
           
            padding: 1rem 0;
        }
        input{
            width:50%;
            margin: 1rem auto;
            padding:0.5rem 0;
        }
        button{
            width:35%;
            margin: 1rem auto;
            padding:1rem;
        }
        .err{
            color:#f3f3f3;
            font-style:italic;
        }
    }
`

export default FormStyle