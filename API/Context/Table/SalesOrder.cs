﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace API.Context.Table;

public partial class SalesOrder
{
    public int ID { get; set; }

    public int? CustomerID { get; set; }

    public short StatusID { get; set; }

    public string Note { get; set; }
}