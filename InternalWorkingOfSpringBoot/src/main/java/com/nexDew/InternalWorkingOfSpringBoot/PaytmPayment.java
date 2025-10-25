package com.nexDew.InternalWorkingOfSpringBoot;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "payment.provider", havingValue = "Paytm")
public class PaytmPayment implements PaymentService {
    public String payment(){
        String payment = "Paytm";
        System.out.println("Payment from: "+payment);
        return payment;
    }


}
