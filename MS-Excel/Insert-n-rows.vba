Sub insert_n_rows()
' Insert multiple rows at once. Rows are inserted above the
' currently selected row/cell
      Dim lNewRows                           As Long
      Dim lCurrentRow                        As Long


      ' detect if current selection is a row or cell
      If UCase(TypeName(Selection)) <> "RANGE" Then
            MsgBox "Please select an initial row or cell to insert rows above.", _
                   vbInformation
            Exit Sub
      End If


      ' Let user choose an amount of rows to insert:
      lNewRows = Application.InputBox("Number of rows to insert", _
                                      "Insert multiple rows", 1, , , , , 1)


      ' Cancel if amount is 0 or user choose to cancel:
      If lNewRows <= 0 Then Exit Sub


      ' Insert the rows:
      Rows(Selection.Cells(1).Row & ":" & _
           Selection.Cells(1).Row + lNewRows - 1).Insert shift:=xlDown


End Sub
