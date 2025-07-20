package com.example.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WebAccount {
    private String accountId;
    private String companyName;
    private String email;
    private String username;
    private String password;
    private String resourceLink;
    private Date creation_date;
    private Date updated_date;
}
