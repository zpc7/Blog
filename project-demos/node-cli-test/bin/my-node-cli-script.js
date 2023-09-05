#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");

program.version("0.0.1").description("A cli application named my-node-cli");

program
  .command("name <name>")
  .description("添加新的名字")
  .action((source) => {
    console.log(chalk.red('红色的字')) 
    console.log(chalk.blue.bgRed('蓝色的字带红色背景')) 
    console.log("##source:", source);
    console.log(chalk.green('绿色的字')) 
  });

program
  .option("-pe, --peppers", "Add peppers")
  .option("-pi, --pineapple", "Add pineapple")
  .option("-b, --bbq-sauce", "Add bbq sauce")
  .option(
    "-c, --cheese [type]",
    "Add the specified type of cheese [marble]",
    "marble"
  );

program
    .command('diy')
    .alias('d')
    .description('自定义用户输入')
    .action(option => {
        var config = {
            userName: '',
            description: '',
            cssStyle: '',
            jsOrTs:''
        }
        var promps = []

        console.log('🚀🚀🚀🚀🚀🚀🚀🚀')
        console.log(chalk.red('请按照提示操作, 可使用 Enter 和方向键'))     

        if(config.userName === '') {
              promps.push({
                type: 'input',
                name: 'userName',
                message: '请输入尊姓大名',
                validate: function (input){
                    if(!input) {
                        return '尊姓大名不能为空'
                    }
                    return true
                }
              })
        } 

        if(config.description === '') {
            promps.push({
                type: 'input',
                name: 'description',
                message: '请输入模块描述'
            })
        }

        if(config.cssStyle === '') {
          promps.push({
            type: 'list',
            name: 'cssStyle',
            message: '想用什么css预处理器?',
            choices: [
              {
                name: 'Sass/Scss',
                value: 'sass'
              },
              {
                name: 'Less',
                value: 'less'
              },
              {
                name: 'css-in-js',
                value: 'css-in-js'
              }
            ]
          })
        }
        if(config.jsOrTs === '') {
          promps.push({
            type: 'list',
            name: 'jsOrTs',
            message: '你喜欢JS还是TS?',
            choices: [
              {
                name: 'Typescript',
                value: 'TS'
              },
              {
                name: 'Javascript',
                value: 'JS'
              }
            ]
          })
        }

        inquirer.prompt(promps).then(function (answers) {
            console.log(chalk.blue('Done'))
            console.log('你的回答如下:',answers)
        })
    }) 

    program.parse(process.argv);