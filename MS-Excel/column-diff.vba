Sub CompareColumns()
        Dim Column1 As Range
        Dim Column2 As Range
        Dim Cell1 As Range
  'Prompt user for the first column range to compare...
  '----------------------------------------------------
        Set Column1 = Application.InputBox("Select First Column to Compare", Type:=8)
   
        'Check that the range they have provided consists of only 1 column...
        If Column1.Columns.Count > 1 Then
   
          Do Until Column1.Columns.Count = 1
     
            MsgBox "You can only select 1 column"
            Set Column1 = Application.InputBox("Select First Column to Compare", Type:=8)
       
          Loop
     
        End If
  
  'Prompt user for the second column range to compare...
  '----------------------------------------------------
        Set Column2 = Application.InputBox("Select Second Column to Compare", Type:=8)
   
        'Check that the range they have provided consists of only 1 column...
        If Column2.Columns.Count > 1 Then
   
          Do Until Column2.Columns.Count = 1
     
            MsgBox "You can only select 1 column"
            Set Column2 = Application.InputBox("Select Second Column to Compare", Type:=8)
       
          Loop
     
        End If
   
 
  'Check both column ranges are the same size...
  '---------------------------------------------
 ' If Column2.Rows.Count <> Column1.Rows.Count Then
 '
  '  Do Until Column2.Rows.Count = Column1.Rows.Count
   '
        '  MsgBox "The second column must be the same size as the first"
         ' Set Column2 = Application.InputBox("Select Second Column to Compare", Type:=8)
     
   ' Loop
   
  'End If
 
  'If entire columns have been selected (e.g. $AEmbarrassedA), limit the range sizes to the
  'UsedRange of the active sheet. This stops the routine checking the entire sheet
  'unnecessarily.
  '-------------------------------------------------------------------------------
  'If Column1.Rows.Count = 65536 Then
'
'
   'Set Column1 = Range(Column1.Cells(1), Column1.Cells(ActiveSheet.UsedRange.Rows.Count))
   'Set Column2 = Range(Column2.Cells(1), Column2.Cells(ActiveSheet.UsedRange.Rows.Count))
'
'
 ' End If
 
  
Dim cfindq As Range, rc As Range, cc As Range, rc2 As Range, cc2 As Range, x As Double
Dim flag As Boolean
Dim matchRow As Integer




Dim temp As Integer


On Error Resume Next


'        work.Cells.Interior.ColorIndex = xlNone
        Set rc = Column2
        Set rc2 = Column1
    
        For Each cc In rc
            cc.Interior.ColorIndex = xlNone
        
            x = cc.Value
            flag = False
        
            For Each cc2 In rc2
        
                cc2.Interior.ColorIndex = xlNone
            
            
                If (Fix(x) = Fix(cc2.Value)) Then
                    flag = True
                    matchRow = cc2.Row
                
                End If
            Next
        
            If (flag = False) Then
                    cc.Interior.ColorIndex = 6
                Else
                    If (matchRow <> cc.Row) Then
                        cc.Interior.ColorIndex = 8
            
                    End If
              
                End If
            
        Next
        
        
         
'Next cc
            'temp = Application.InputBox("row1 = " + cc.Row + cfindq.Row)
        
        




'Perform the comparison and set cells that are the same to yellow
'----------------------------------------------------------------
'  Dim intCell As Long
'  Dim offset As Integer
'
'  Dim shorterCol As Integer
'
'  If Column1.Rows.Count < Column2.Rows.Count Then
'        shorterCol = Column1.Rows.Count
'  Else
'        shorterCol = Column2.Rows.Count
'
'  End If
'
'  offset = Column1.Row
'
'  For intCell = 1 To shorterCol
'   If Column1.Cells(offset + intCell) <> Column2.Cells(offset + intCell) Then
'
'          Column1.Cells(offset + intCell).Interior.Color = vbBlue
'          Column2.Cells(offset + intCell).Interior.Color = vbBlue
'
'        End If
'
'  Next
'With Column1
'                .Cells.Interior.ColorIndex = xlNone
'                Set cfindq = .Cells.Find(what:=x, lookat:=xlWhole)
'                If cfindq Is Nothing Then
'                    cc.Interior.ColorIndex = 6
'                Else
'                    If (cfindq.Row <> cc.Row) Then
'                        cc.Interior.ColorIndex = 8
'
'                    End If
'
'                End If
'
'                End With
'
End Sub
