const User = require('../models/user');
const passport = require('passport');

module.exports = {
    isAuthenticated: (req, res, next) => {  
        if (req.isAuthenticated()) {
          return next();
        } else {
          res.status(200).json({ RetCode:0, RetVal:"必须先登录" });
        }
    },

    isNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.status(200).json({ RetCode:1, RetVal:"您已经登录" });
        } else {
          return next();
        }
    },

    notAuthenticatedHandle:(req,res,next) => {
        res.status(200).json({ RetCode:0, RetVal:"当前未登录" });
    },

    index: async (req, res, next) => {
        try {
            const allRows = await User.find();
            const allCount = allRows.length;
            const returnRows = allRows.slice(0,10);
            const curPage = 1;
            const curPageCount = returnRows.length;
            res.status(200).json({ RetCode:1, RetVal:'获取默认用户页信息', curPage, curPageCount, allCount,DataRows:returnRows });
        } catch (error) {
            next(error)
        }
    },


    pagination: async (req,res,next) => {
        try {
            const reqPage = req.value.params.reqpage  ;
            const reqPageSize = req.value.params.reqsize ;
            const curItem = (reqPage-1)*reqPageSize ;
            const allRows = await User.find();
            const allCount = allRows.length;
            const returnRows = allRows.slice(curItem,curItem+reqPageSize);
            const curPageCount = returnRows.length;
            res.status(200).json({ RetCode:1, RetVal:'获取用户分页信息', curPage: reqPage, curPageCount, allCount,DataRows:returnRows });
        } catch (error) {
            next(error)
        }
    },

    userLogin: (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.status(200).json({ RetCode:0, RetVal:"用户名或密码错误" }) }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              req.session.user=user;
              return res.status(200).json({ RetCode:1, RetVal:"验证成功", user })
            });
        })(req, res, next);
    },

    userLogout: (req, res) => {
        req.logout();
        res.status(200).json({ RetCode:1, RetVal:"登出成功" })
      },

    newUser: async (req, res, next) => {
        try {
            const user = await User.findOne({ 'email': req.value['body'].email });
            if (user) {
              res.status(200).json({RetCode:0, RetVal:"该账户已存在"})
              return;
            }
            
            const hash = await User.hashPassword(req.value['body'].password);

            delete req.value['body'].confirmationPassword;
            req.value['body'].password = hash;

            const newUser = new User(req.value['body']);
            await newUser.save();
            res.status(201).json( {RetCode:1, RetVal: '1', DataRows:[newUser]} );
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req,res,next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        const resultUser = await result.save();
        res.status(200).json({RetCode:1, RetVal:"操作成功", resultUser});
    }
}