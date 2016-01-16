param([string]$Command)


function DoRestore
{
    Write-Host "Install Grunt-cli" -ForegroundColor Gray
    & npm install grunt-cli -g
    Write-Host "Install node packages" -ForegroundColor Gray
    & npm install

    IncludeMysqlInPath
    IncludeGnuwinInPath

    Write-Host "Run setup using grunt" -ForegroundColor Gray
    & grunt getup

    IisSetup
}

function IisSetup 
{
    Write-Host "Create IIS website" -ForegroundColor Gray
    $Dir = Join-Path $PWD "deploy"
    $HostName = "local.kragefolket.dk"
    CreateLocalWebsite -Path $Dir -HostName $HostName
    AddToHostsFile -HostName $HostName -Ip "127.0.0.1"
}

function CreateLocalWebsite([string]$Path, [string]$HostName) 
{
    $Name = "Kragefolket local"
    $Website = Get-Website -Name $Name
    if($Website -eq $null) 
    { 
        $Website = New-Website -Name "Kragefolket local" -Port 80 -HostHeader $HostName -PhysicalPath $Path
        Write-Host "Created IIS website"
    } else {
        Write-Host "IIS site already exists"
    }
}

function IncludeGnuwinInPath 
{
    try 
    {
        & sed
    } catch {
        $Path = "C:\Program Files (x86)\GnuWin32\bin"
        IncludeInPath -NewFolderPath $Path
    }
}

function IncludeMysqlInPath {
    try 
    {
        & mysql
    } catch {
        Write-Host "Missing mysql in path, will try to find and include..."

        $mysqlfolder = (Get-ChildItem -Path $env:ProgramFiles -Filter "Mysql")
        if($mysqlfolder.Length -eq 0) 
        {
            $mysqlfolder = (Get-ChildItem -Path ${env:ProgramFiles(x86)} -Filter "Mysql")
        }

        if($mysqlfolder.Length -eq 0) 
        {
            Write-Error "Could not find folder for MySql program. Please ensure that mysql is in path"
            return
        }

        $mysqlfolderpath = ($mysqlfolder[0].FullName)
        $mysqlserver = (Get-ChildItem -Path $mysqlfolderpath -Filter "MySQL Server *")
        if($mysqlserver.Length -eq 0) 
        {
            Write-Error "Could not find MySql server folder in $mysqlfolderpath Please ensure that mysql is in path"
            return
        }

        $mysqlbin = Join-Path $mysqlserver[0].FullName "bin"
        if((Test-Path $mysqlbin) -eq $false) 
        {
            Write-Error "Expected mysql bin folder at $mysqlbin but it was not found Please ensure that mysql is in path"
            return
        }

        IncludeInPath -NewFolderPath $mysqlbin
    }
}

function IncludeInPath([string]$NewFolderPath) {
    $oldPath = $env:Path
    $NewPath = "$oldPath;$NewFolderPath"
    [System.Environment]::SetEnvironmentVariable('Path', $NewPath, 'Process')

    Write-Host "Temporary included $NewFolderPath in path"
}

function AddToHostsFile([string]$HostName, [string]$Ip) 
{
    $path = Join-Path $env:windir "system32\drivers\etc\hosts"
    $content = Get-Content $path
    $contains = $false
    $content | %{ if($_ -match $HostName) { $contains = $true } }
    if($contains) 
    {
        Write-Host "$HostName already in hosts file"
        return
    }

    Add-Content -Path $path -Value "`n$Ip`t$HostName"
    Write-Host "Added $HostName to local hosts file"
}

if($Command -ieq "restore") 
{
    DoRestore
} 
elseif($Command -ieq "iis") 
{
    IisSetup
} 
else 
{
    Write-Host "Supported commands:" -ForegroundColor Yellow
    Write-Host "  restore      Install depepndencies and setup IIS" -ForegroundColor Yellow
    Write-Host "  iis          Setup local IIS website" -ForegroundColor Yellow
}
