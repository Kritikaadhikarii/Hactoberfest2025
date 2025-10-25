package com.nexDew.InternalWorkingOfSpringBoot;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "payment.provider", havingValue = "PhonePay")
public class PhonePayPayment implements PaymentService{
    public String payment(){
        String payment = "PhonePay";
        System.out.println("PhonePay from: "+payment);
        return payment;
    }

}
