import {app, server} from '../src/app';

import { expect } from 'chai';
import supertest from 'supertest';

import { catchError } from '../src/common/helpers/catch.helper';

// import { Response } from '../common/types/response.types';

import otpServices from '../src/common/services/otp.services';

// import {MailService} from '../common/services/mailer.services';

describe('LOGIN API', function() {
    // let request: supertest.SuperAgentTest;
    // before(function() {
    //     request = supertest.agent(app);
    // });
    after(function(done) {
        server.close(done);
    })

    describe('API ENDPOINT', function() {
        let request: supertest.SuperAgentTest;
        before(function() {
            request = supertest.agent(app);
        });

        it('should return fullhash', async function () {
            try {
                const res = await request.post('/createOTP').send({
                    "EMAILID": "amey2p@gmail.com"
                });
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.data.message).to.equal("OTP sent successfully");
            }
            catch(e: unknown) {
                console.log(await catchError(e));
            }
        });
    
        it('should throw an error', async function () {
            try {
                const res = await request.post('/createOTP').send({
                    "EMAILID": "amey2p@gmailcom"
                });
                expect(res.status).to.equal(400);
                expect(res.body.success).to.equal(false);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('Response');
                expect(res.body.data.message).to.equal("Invalid type for property /EMAILID");
            }
            catch(e: unknown) {
                console.log(await catchError(e));
            }
        })

        it('should show user already exists while registration', async function () {
            try {
                const res = await request.post('/registerUser').send({
                    "EMAILID": "amey2p@gmail.com",
                    "PASSWORD": "pass@1234",
                    "FIRSTNAME": "Ameya",
                    "LASTNAME": "Patil",
                    "FLAG": "REGISTER"

                });
                expect(res.status).to.equal(409);
                expect(res.body.success).to.equal(false);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('Response');
                expect(res.body.data.message).to.equal("User already exists");
            }
            catch(e: unknown) {
                console.log(await catchError(e));
            }
        })

        it('should login the user', async function () {
            try {
                const res = await request.post('/registerUser').send({
                    "EMAILID": "amey2p@gmail.com",
                    "PASSWORD": "pass@1234",
                    "FLAG": "LOGIN"

                });
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('Response');
                expect(res.body.data.message).to.equal("Logged in successfully");
                expect(res.body.data.data).to.have.keys(['id','EMAILID','FIRSTNAME','LASTNAME'])
            }
            catch(e: unknown) {
                console.log(await catchError(e));
            }
        })
    });

    describe('Unit function', async function() {
        it('should return OTP', async function(){
            try {
                expect(otpServices.createOTP("amey2p@gmailcom")).to.be.an('string').that.have.lengthOf(6);
                // expect(otpServices.createOTP("amey2p@gmailcom").length).to.be.an('string');
            }
            catch(e: unknown) {
                console.log(await catchError(e));
            }
        })
    
        // it('should send mail', async function(){
        //     try {
        //         let mailService = new MailService()
        //         expect(mailService.sendMail({"amey2p@gmail.com", "Test mail", "Test")).to.be.an('object');
        //         expect(mailService.sendMail("amey2p@gmail.com", "Test mail", "Test")).to.have.keys(['accepted', 'rejected', 'ehlo', 'envelopeTime', 'messageTime', 'messageSize', 'response', 'envelope', 'messageId']);
        //         expect(mailService.sendMail("amey2p@gmail.com", "Test mail", "Test")).to.haveOwnProperty('accepted').to.equal(['amey2p@gmail.com']);
        //         expect(mailService.sendMail("amey2p@gmail.com", "Test mail", "Test")).to.haveOwnProperty('envelope').to.equal({ from: 'a.may3pp@gmail.com', to: [ 'amey2p@gmailcom' ] });
        //         expect(mailService.sendMail("amey2p@gmail.com", "Test mail", "Test")).to.haveOwnProperty('response').to.contain('250 2.0.0 OK');                
        //     }
        //     catch(e: any) {
        //         console.log(e.message);
        //     }
        // })


    
    
    })


})

