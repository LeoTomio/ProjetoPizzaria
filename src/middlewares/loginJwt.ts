import jwt from 'jsonwebtoken';



export const loginJwt = (token: any) => {
   if (token) {
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         return decoded;
      } catch (error) {
         return { msg: "Dados de login incorretos", statusCode: 401 };
      }
   } else {
      return { msg: "É preciso estar logado", statusCode: 401 };
   }
};

export const decode = (token) => {
   return jwt.decode(token);
}
